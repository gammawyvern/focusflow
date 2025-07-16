using FocusFlow.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FocusFlow.Data;

public static class DbInitializer
{
    public static void Seed(AppDbContext context)
    {
        if (context.Tasks.Any()) { return; }
    
        context.Tasks.AddRange(
            new TaskItem
            {
                Title = "Create Database",
                Description = "Setup MySQL and install SSMS.",
                DueDate = DateOnly.FromDateTime(DateTime.Now)
            },
            new TaskItem
            {
                Title = "Learn about EF Core",
                Description = "Understand the core principles, migrations, etc.",
                DueDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-1))
            },
            new TaskItem
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