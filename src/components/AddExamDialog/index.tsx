// TODO; refactor form with hook form and zod
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../shadcn-ui/dialog";
import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { useState } from "react";

export const AddExamDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (exam: {
    name: string;
    routeParam: string;
    pageLabel: string;
    menuLabel: string;
  }) => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    routeParam: "",
    pageLabel: "",
    menuLabel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only allow lowercase letters, numbers, and hyphens for routeParam
    if (name === 'routeParam') {
      const validValue = value.replace(/[^a-z0-9-]/g, '');
      setFormData((prev) => ({ ...prev, [name]: validValue }));
      // If invalid characters were entered, update the input value
      if (validValue !== value) {
        e.target.value = validValue;
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", routeParam: "", pageLabel: "", menuLabel: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exam</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new exam.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Exam Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., AWS Certified Solutions Architect Associate"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="routeParam" className="text-sm font-medium">
              Route Parameter
            </label>
            <Input
              id="routeParam"
              name="routeParam"
              placeholder="e.g., saac03"
              value={formData.routeParam}
              onChange={handleChange}
              required
              pattern="^[a-z0-9-]+$"
            />
            <p className="text-xs text-muted-foreground">
              Used in URLs. Can only contain lowercase letters, numbers, and hyphens.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="pageLabel" className="text-sm font-medium">
              Page Label
            </label>
            <Input
              id="pageLabel"
              name="pageLabel"
              placeholder="Label shown on the page"
              value={formData.pageLabel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="menuLabel" className="text-sm font-medium">
              Menu Label
            </label>
            <Input
              id="menuLabel"
              name="menuLabel"
              placeholder="Label shown in the menu"
              value={formData.menuLabel}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter className="mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Exam</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
