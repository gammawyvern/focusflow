using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Data.Entities;
using FocusFlow.Repositories;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/tasks")]
public class TaskApiController(ITaskItemRepository taskItemRepository) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await taskItemRepository.GetAllAsync();
        var taskViews = tasks
            .Select(TaskItemMapper.ToDto)
            .ToList();
        
        return Ok(taskViews);
    }
}