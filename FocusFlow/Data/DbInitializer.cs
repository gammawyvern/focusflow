using FocusFlow.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Task = FocusFlow.Models.Task;

namespace FocusFlow.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {
        if (context.Tasks.Any()) { return; }
    
        context.Tasks.AddRange(
            new Task
            {
                Title = "Create Database",
                Description = "Setup MySQL and install SSMS.",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new Task
            {
                Title = "Learn about EF Core",
                Description = "Understand the core principles, migrations, etc.",
                DueDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-1))
            },
            new Task
            {
                Title = "Have weekly code review",
                Description = "Go over project setup, basic models, etc.",
                DueDate = DateOnly.FromDateTime(DateTime.Now.AddDays(1))
            }
        );
        
        context.SaveChanges();
        Console.WriteLine("Seeded Task database.");
    }
}