using Microsoft.AspNetCore.Mvc; 
    
namespace FocusFlow.Controllers;

public class StyleGuideController: Controller
{
    private readonly ILogger<StyleGuideController> _logger;

    public StyleGuideController(ILogger<StyleGuideController> logger)
    {
        this._logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
}