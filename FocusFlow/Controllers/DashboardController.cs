using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;
using FocusFlow.Models;
using FocusFlow.Helpers;

namespace FocusFlow.Controllers;

public class DashboardController : Controller
{
    private readonly AppDbContext _dbContext;

    public DashboardController(AppDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    public IActionResult Index(int? activeTaskId)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var taskSummaries = this._dbContext.Tasks
            .Where(task => task.DueDate == today)
            .Select(task => TaskDisplayHelper.TaskEntityToView(task, activeTaskId))
            .ToList();

        var dashboardView = new DashboardViewModel
        {
            TaskSummaries = taskSummaries
        };
            
        return View(dashboardView);
    }
}