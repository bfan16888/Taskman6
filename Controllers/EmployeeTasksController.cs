using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskman6.Data;
using Taskman6.Models;

namespace Taskman6.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeTasksController : ControllerBase
    {
        private readonly TaskmanDbContext _context;

        public EmployeeTasksController(TaskmanDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeTask>>> GetEmployeeTasks()
        {
            return await _context.EmployeeTasks.ToListAsync();
        }

        // GET: api/EmployeeTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeTask>> GetEmployeeTask(int id)
        {
            var employeeTask = await _context.EmployeeTasks.FindAsync(id);

            if (employeeTask == null)
            {
                return NotFound();
            }

            return employeeTask;
        }

        // PUT: api/EmployeeTasks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeTask(int id, EmployeeTask employeeTask)
        {
            if (id != employeeTask.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(employeeTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeTasks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EmployeeTask>> PostEmployeeTask(EmployeeTask employeeTask)
        {
            _context.EmployeeTasks.Add(employeeTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeTask", new { id = employeeTask.TaskId }, employeeTask);
        }

        // DELETE: api/EmployeeTasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmployeeTask>> DeleteEmployeeTask(int id)
        {
            var employeeTask = await _context.EmployeeTasks.FindAsync(id);
            if (employeeTask == null)
            {
                return NotFound();
            }

            _context.EmployeeTasks.Remove(employeeTask);
            await _context.SaveChangesAsync();

            return employeeTask;
        }

        private bool EmployeeTaskExists(int id)
        {
            return _context.EmployeeTasks.Any(e => e.TaskId == id);
        }
    }
}