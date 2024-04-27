import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ContentCard } from "./ContentCard";
import { ContentCardProps as Props } from "./ContentCard.interface";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockProps: Props = {
  id: "123",
  title: "This is a very long title that will be trimmed",
  content:
    "This is some content that will also be trimmed to a specific length for display in the card.",
};

describe("ContentCard component", () => {
  it("should render the card title with trimmed text", () => {
    const { getByText } = render(<ContentCard {...mockProps} />);

    expect(getByText(mockProps.title.slice(0, 28) + "...")).toBeInTheDocument();
  });

  it("should render the card content with trimmed text", () => {
    const { getByText } = render(<ContentCard {...mockProps} />);

    expect(
      getByText(mockProps.content.slice(0, 300) + "...")
    ).toBeInTheDocument();
  });

  it("should call router.push on View More button click", () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByText } = render(<ContentCard {...mockProps} />);

    const viewMoreButton = getByText("View More");
    fireEvent.click(viewMoreButton);

    expect(router.push).toBeCalledWith(`/content/${mockProps.id}`);
  });
});
export { ContentCard };
