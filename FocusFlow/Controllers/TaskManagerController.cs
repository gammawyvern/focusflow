using Microsoft.AspNetCore.Mvc;

using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class TaskManagerController: Controller
{
    public IActionResult Index(bool? showCompleted, DateTime? startDate, DateTime? endDate)
    {
        var model = new TaskManagerViewModel
        {
            ShowCompleted = showCompleted ?? true,
            StartDate = startDate,
            EndDate = endDate
        };
            
        return View(model);
    }
}