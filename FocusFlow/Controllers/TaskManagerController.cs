using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;
using FocusFlow.Services;

namespace FocusFlow.Controllers;

public class TaskManagerController(ITaskService taskService): Controller
{
    public IActionResult Index()
    {
        return View();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateTask()
    {
        await taskService.CreateEmptyTaskAsync();
        return RedirectToAction("Index");
    }
    
    [HttpPost]
    public async Task<IActionResult> DeleteTask(int id)
    {
        await taskService.DeleteTaskAsync(id);
        return RedirectToAction("Index");
    }
    
    [HttpPost]
    public async Task<IActionResult> SetTaskComplete(int id, bool complete)
    {
        await taskService.SetTaskCompleteAsync(id, complete);
        return RedirectToAction("Index");
    }

    [HttpPost]
    public async Task<IActionResult> UpdateTask(int id, string? title, string? description, DateOnly? dueDate, long? displayMinutes, long? displaySeconds)
    {
        var seconds = displaySeconds ?? 0; 
        seconds += displayMinutes == null ? 0 : displayMinutes.Value * 60;
        await taskService.UpdateTaskAsync(id,  title, description, dueDate, seconds);
        return RedirectToAction("Index");
    }
}