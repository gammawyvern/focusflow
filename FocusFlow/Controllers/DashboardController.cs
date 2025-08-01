using FocusFlow.Models;
using FocusFlow.Services;
using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.Controllers;

public class DashboardController(ITaskService taskService): Controller
{
    public IActionResult Index(bool? showCompleted)
    {
        var model = new DashboardViewModel
        {
            ShowCompleted = showCompleted ?? true,
            StartDate = DateTime.Today,
            EndDate = DateTime.Today
        };
            
        return View(model);
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
    public async Task<IActionResult> SetTaskActive(int id)
    {
        await taskService.SetActiveTaskAsync(id);
        return RedirectToAction("Index");
    }

    [HttpPost]
    public async Task<IActionResult> UpdateTask(int id, string? title, string? description, DateTime? dueDate, long? displayMinutes, long? displaySeconds)
    {
        var seconds = displaySeconds ?? 0; 
        seconds += displayMinutes == null ? 0 : displayMinutes.Value * 60;
        await taskService.UpdateTaskAsync(id, title, description, dueDate, seconds);
        return RedirectToAction("Index");
    }
}