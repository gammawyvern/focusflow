using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;

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
        return View();
    }
}