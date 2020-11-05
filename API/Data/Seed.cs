using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUsers> userManager,RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userdata = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUsers>>(userdata);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name="Member" },
                new AppRole{Name="Admin" },
                new AppRole{Name="Moderator" },

            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                //using var hmac = new HMACSHA512();

                user.Name = user.Name.ToLower();
                user.UserName= user.Name.ToLower();
                //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("123"));
                //user.PasswordSalt = hmac.Key;
                await userManager.CreateAsync(user, "123");
                await userManager.AddToRoleAsync(user, "Member");

                //userManager.Users.Add(user);
            }

            var admin = new AppUsers
             {
                UserName="admin",
                Name="admin"
            };
            await userManager.CreateAsync(admin, "admin");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
            //await userManager.SaveChangesAsync();

        }
    }
}
