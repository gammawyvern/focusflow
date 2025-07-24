using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskSummaryViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}