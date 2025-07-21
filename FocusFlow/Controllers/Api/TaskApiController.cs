using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;
using FocusFlow.Helpers;
using Microsoft.EntityFrameworkCore;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class TaskApiController : Controller
{
    private readonly AppDbContext _dbContext;

    public TaskApiController(AppDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await this._dbContext.Tasks
            .Select(task => TaskDisplayHelper.TaskEntityToView(task))
            .ToListAsync();
        
        return Ok(tasks);
    }
}