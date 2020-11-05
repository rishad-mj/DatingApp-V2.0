using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService = null;
        private readonly SignInManager<AppUsers> _signInManager ;
        private readonly UserManager<AppUsers> _userManager;

        public AccountController(UserManager<AppUsers> userManager,SignInManager<AppUsers> signInManager, ITokenService tokenService,IMapper mapper )
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Name.ToLower())) return BadRequest("Username id taken");

            var user = _mapper.Map<AppUsers>(registerDto);

            //using var hmac = new HMACSHA512();

            user.Name = registerDto.Name.ToLower();
            user.UserName = user.Name;
            //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            //user.PasswordSalt = hmac.Key;

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if(!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                name = user.Name,
                Token = await _tokenService.CreateToken(user),
                KnownAs=user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p=>p.Photos)
                .SingleOrDefaultAsync(x => x.Name == loginDto.Name.ToLower());

            if (user == null) return Unauthorized("Invalid username");
            user.UserName = loginDto.Name.ToLower();
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                name = user.Name,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x=>x.Name==username);
        }
    }
}
