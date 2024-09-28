import React from "react";
// For better matchers like `toBeInTheDocument`
import { TreeNode } from "components/treeNode/TreeNode";
import { store } from "features/store";
import { Node } from "features/types";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the moveNode function
jest.mock("utils/dragUtils", () => ({
    moveNode: jest.fn(),
}));

describe("TreeNode Component", () => {
    const mockNode: Node = {
        label: "Root Node",
        children: [{ label: "Child Node", children: [] }],
    };

    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    it("renders the TreeNode component", () => {
        renderWithProvider(<TreeNode node={mockNode} />);

        // Check if the node label is displayed
        expect(screen.getByText("Root Node")).toBeInTheDocument();
    });

    it("handles node click and highlights", () => {
        renderWithProvider(<TreeNode node={mockNode} />);

        const treeNodeElement = screen.getByTestId("tree-node-Root Node");

        // Simulate clicking the tree node
        fireEvent.click(treeNodeElement);

        // Check if the node becomes highlighted after clicking
        expect(treeNodeElement).toHaveClass("lightThemeHighlighted");
    });

    it("handles drag and drop of the node", () => {
        const { moveNode } = require("utils/dragUtils"); // Import the mocked moveNode function

        renderWithProvider(<TreeNode node={mockNode} />);

        const treeNodeElement = screen.getByText("Root Node");

        // Simulate starting a drag event
        fireEvent.dragStart(treeNodeElement, { dataTransfer: { setData: jest.fn() } });

        // Simulate dropping the node
        fireEvent.drop(treeNodeElement, {
            dataTransfer: { getData: () => JSON.stringify(mockNode) },
        });

        // Check that the moveNode function was called after the drop event
        expect(moveNode).toHaveBeenCalled();
    });
});
