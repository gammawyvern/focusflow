using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
// using FocusFlow.Models;

namespace FocusFlow.Controllers;

public class TasksController: Controller
{
    private readonly ILogger<TasksController> _logger;

    public TasksController(ILogger<TasksController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
}