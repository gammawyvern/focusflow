using Microsoft.AspNetCore.Mvc;

using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class DashboardController: Controller
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
}