using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
// using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class FocusController: Controller
{
    private readonly ILogger<FocusController> _logger;

    public FocusController(ILogger<FocusController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
}