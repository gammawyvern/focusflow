using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FocusFlow.Migrations
{
    /// <inheritdoc />
    public partial class AddStartedTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "StartedTime",
                table: "TaskItems",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartedTime",
                table: "TaskItems");
        }
    }
}
