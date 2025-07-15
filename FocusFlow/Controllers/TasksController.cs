using Microsoft.AspNetCore.Mvc;

using FocusFlow.Models;
using FocusFlow.Data;

namespace FocusFlow.Controllers;

public class TasksController: Controller
{
    private readonly AppDbContext _dbContext;

    public TasksController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IActionResult Index()
    {
        return View();
    }
}