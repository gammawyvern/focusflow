using Microsoft.AspNetCore.Mvc;

using FocusFlow.Data;
using FocusFlow.Data.Entities;
using FocusFlow.Models;
using FocusFlow.Helpers.Mapping;
using FocusFlow.Repositories;

namespace FocusFlow.Controllers;

public class DashboardController() : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}