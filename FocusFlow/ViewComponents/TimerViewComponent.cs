using Microsoft.AspNetCore.Mvc;

using FocusFlow.Models;

namespace FocusFlow.ViewComponents;

public class TimerViewComponent: ViewComponent
{

    public IViewComponentResult Invoke()
    {
        var viewModel = new TimerViewModel
        {
            StartTime = DateTime.Now
        };
        
        return View(viewModel);
    }
}