using Microsoft.AspNetCore.Mvc;

namespace FocusFlow.ViewComponents;

public class TaskSummaryPanelViewComponent : ViewComponent
{
    public IViewComponentResult Invoke()
    {
        return View();
    }
}