using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TimerViewComponent: ViewComponent
{

    public IViewComponentResult Invoke()
    {
        return View();
    }
    
}