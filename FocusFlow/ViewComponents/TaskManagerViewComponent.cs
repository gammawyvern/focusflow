using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskManagerViewComponent: ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}