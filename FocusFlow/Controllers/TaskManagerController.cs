using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;
using FocusFlow.Services;

namespace FocusFlow.Controllers;

public class TaskManagerController(ITaskService taskService): Controller
{
    public async Task<IActionResult> Index()
    {
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateTask()
    {
        await taskService.CreateEmptyTaskAsync();
        return RedirectToAction("Index");
    }
}