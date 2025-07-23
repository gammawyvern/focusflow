using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.Controllers;

public class DashboardController: Controller
{
    public IActionResult Index()
    {
        return View();
    }
}