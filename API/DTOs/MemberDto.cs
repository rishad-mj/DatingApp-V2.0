using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        //public int UserName { get; set; }
        public string PhotoUrl { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; } 
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string Lookingfor { get; set; }
        public string City { get; set; }
        public string country { get; set; }

        //oneto Many relations
        public ICollection<PhotoDto> Photos { get; set; }
    }
}
