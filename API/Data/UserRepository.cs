﻿using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string name)
        {
             return await _context.Users.
                 Where(x=>x.Name == name)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedLists<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            query = query.Where(u => u.Name != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxdob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxdob);
                         //.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                         //.AsNoTracking()
                         //.AsQueryable();

            return await PagedLists<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(
                _mapper.ConfigurationProvider).AsNoTracking(), 
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUsers> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUsers> GetUserByUsernameAsync(string name)
        {
            return await _context.Users
                 .Include(p => p.Photos)
                .SingleOrDefaultAsync(x=>x.Name == name);
        }

        public async Task<IEnumerable<AppUsers>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p=>p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUsers user)
        {

            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
