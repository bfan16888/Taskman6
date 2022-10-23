using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taskman6.Models;

namespace Taskman6.Data
{
    public class TaskmanDbContext : DbContext
    {
        public TaskmanDbContext(DbContextOptions<TaskmanDbContext> options) : base(options)
        {}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<EmployeeTask>()
            //    .HasOne(t => t.Employee)
            //    .WithMany(e => e.Tasks)
            //    .HasForeignKey(t=>t.EmployeeId);
        }
        public DbSet<Employee> Employees { get; set; }  = default!;
        public DbSet<EmployeeTask> EmployeeTasks { get; set; } = default!;
    }
}