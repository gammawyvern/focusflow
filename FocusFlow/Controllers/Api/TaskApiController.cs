using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Data.Entities;
using FocusFlow.Repositories;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class TaskApiController(ITaskItemRepository taskItemRepository) : Controller
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