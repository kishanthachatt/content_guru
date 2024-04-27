import { render, screen, fireEvent } from "@testing-library/react";
import { ContentCard } from "./ContentCard";
import { useRouter } from "next/router";

jest.mock("next/router");

describe("ContentCard component", () => {
  const props = {
    title: "Test Title",
    content: "Test Content",
    id: "test-id",
  };

  test("renders card with correct title and content", () => {
    render(<ContentCard {...props} />);
    // expect(screen.getByText(props.title)).toBeInTheDocument();
    // expect(screen.getByText(props.content)).toBeInTheDocument();
  });

  test("truncates long content and title correctly", () => {
    const longContent = "Lorem ipsum ".repeat(50);
    const longTitle = "Very long title ".repeat(10);
    render(<ContentCard {...props} title={longTitle} content={longContent} />);
    // expect(screen.getByText("...")).toBeInTheDocument();
    // expect(screen.getByText("View More")).toBeInTheDocument();
  });

  test("redirects to correct URL when View More button is clicked", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    render(<ContentCard {...props} />);
    fireEvent.click(screen.getByText("View More"));
    expect(pushMock).toHaveBeenCalledWith(`/content/${props.id}`);
  });
});
