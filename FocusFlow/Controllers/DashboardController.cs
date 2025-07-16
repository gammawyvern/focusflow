using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;
using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class DashboardController : Controller
{
    private readonly AppDbContext _dbContext;

    public DashboardController(AppDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    public IActionResult Index()
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var taskSummaries = this._dbContext.Tasks
            .Where(task => task.DueDate == today)
            .Select(task => new TaskSummaryViewModel {
                Title = task.Title,
                Description  =  task.Description,
                IsCompleted  =   task.IsCompleted,
                TimeLoggedString  = $"{task.SecondsLogged / 60} mins", 
                DueDateString  = task.DueDate.ToString("ddd, MMM dd"), 
                IsActive = false
            }).ToList();

        var dashboardView = new DashboardViewModel
        {
            TaskSummaries = taskSummaries
        };
            
        return View(dashboardView);
    }
}