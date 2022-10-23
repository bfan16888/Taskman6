using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Taskman6.Models
{
    public class EmployeeTask
    {
        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; } = default!;
        public DateTime StartTime { get; set; }
        public DateTime Deadline { get; set; }
        public int EmployeeId { get; set; }
    }
}