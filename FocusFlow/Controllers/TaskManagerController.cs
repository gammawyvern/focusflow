using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Models;
using FocusFlow.Repositories;

namespace FocusFlow.Controllers;

public class TaskManagerController(ITaskItemRepository taskItemRepository): Controller
{
    public async Task<IActionResult> Index()
    {
        return View();
    }
}