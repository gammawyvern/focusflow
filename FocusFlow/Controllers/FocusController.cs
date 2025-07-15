using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;

namespace FocusFlow.Controllers;

public class FocusController: Controller
{
    private readonly AppDbContext _dbContext;

    public FocusController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IActionResult Index()
    {
        return View();
    }
}