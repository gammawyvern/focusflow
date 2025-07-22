using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;
using FocusFlow.Data.Entities;
using FocusFlow.Helpers;
using FocusFlow.Helpers.Mapping;
using FocusFlow.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class TaskApiController(IRepository<TaskItem> taskItemRepository) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await taskItemRepository.GetAllAsync();
        var taskViews = tasks
            .Select(TaskItemMapper.TaskItemToTaskSummaryViewModel)
            .ToList();
        
        return Ok(taskViews);
    }
}