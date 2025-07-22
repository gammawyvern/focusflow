using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskPanelViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}