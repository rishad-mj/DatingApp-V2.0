using API.DTOs;
using API.Entities;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interface
{
    public interface IUserRepository
    {
        void Update(AppUsers user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUsers>> GetUsersAsync();
        Task<AppUsers>GetUserByIdAsync(int id);
        Task<AppUsers> GetUserByUsernameAsync(string username);
        Task<PagedLists<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);
    }
}
