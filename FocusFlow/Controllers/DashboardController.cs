using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
// using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class DashboardController : Controller
{
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(ILogger<DashboardController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult StyleGuide()
    {
        return View();
    }
}