using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;

namespace FocusFlow.Controllers;

public class TaskManagerController: Controller
{
    private readonly AppDbContext _dbContext;

    public TaskManagerController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IActionResult Index()
    {
        return View();
    }
}