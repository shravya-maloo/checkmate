import React, { useState } from 'react';
import { Category, Task, Deadline } from '../App';
import { CategoryView } from './CategoryView';
import {
  FolderKanban,
  ChevronRight,
  Search,
  Edit2,
  Trash2,
  Plus,
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { getIconComponent, iconMap } from '../utils/iconMap';
import { Label } from './ui/label';

interface CategoriesViewProps {
  categories: Category[];
  tasks: Task[];
  deadlines: Deadline[];
  onAddTask: (
    categoryId: string,
    name: string,
    details: string,
    priority: 'high' | 'medium' | 'low',
    effort: 'high' | 'medium' | 'low'
  ) => void;
  onAddDeadline: (
    categoryId: string,
    name: string,
    details: string,
    date: string
  ) => void;
  onToggleTask: (taskId: string) => void;
  onToggleDeadline: (deadlineId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onDeleteDeadline: (deadlineId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onUpdateDeadline: (
    deadlineId: string,
    updates: Partial<Deadline>
  ) => void;
  onAddCategory: (name: string, icon: string) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoriesView({
  categories,
  tasks,
  deadlines,
  onAddTask,
  onAddDeadline,
  onToggleTask,
  onToggleDeadline,
  onDeleteTask,
  onDeleteDeadline,
  onUpdateTask,
  onUpdateDeadline,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoriesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [newCategory, setNewCategory] = useState('');
  const [editing, setEditing] = useState<Category | null>(null);

  // Icon picker popup state
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [pendingName, setPendingName] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    const next = new Set(openCategories);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenCategories(next);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openIconPickerFor = (name: string) => {
    setPendingName(name);
    setIconPickerOpen(true);
  };

  const handleIconSelect = (iconName: string) => {
    if (!pendingName) return;
    onAddCategory(pendingName, iconName || 'GraduationCap');
    setPendingName(null);
    setNewCategory('');
    setIconPickerOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="mb-2">Categories</h2>
        <p className="text-gray-600">
          Select a category to manage tasks and deadlines
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="pl-10"
        />
      </div>

      {/* Add Category */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />

        <div className="flex items-center gap-2">
          <Button
            className="h-9"
            onClick={() => {
              const name = newCategory.trim();
              if (!name) return;
              // open icon picker popup; user will choose icon to finalize add
              openIconPickerFor(name);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Icon picker dialog (opened after user clicks Add) */}
      <Dialog
        open={iconPickerOpen}
        onOpenChange={(open) => {
          setIconPickerOpen(open);
          if (!open) {
            setPendingName(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {pendingName ? (
                <>Pick an icon for “{pendingName}”</>
              ) : (
                <>Pick an icon</>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-3">
            <Label className="mb-2">Tap an icon to select it</Label>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-2">
              {Object.keys(iconMap).map((iconName) => {
                const Icon = getIconComponent(iconName);
                return (
                  <button
                    key={iconName}
                    onClick={() => handleIconSelect(iconName)}
                    className="flex items-center justify-center p-2 rounded-lg border bg-white hover:shadow-sm focus:shadow-sm focus:outline-none"
                    aria-label={iconName}
                    type="button"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-800" />
                    </div>
                    <span className="sr-only">{iconName}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // fallback: if user cancels, allow add with default icon
                  if (pendingName) {
                    onAddCategory(pendingName, 'GraduationCap');
                  }
                  setPendingName(null);
                  setIconPickerOpen(false);
                  setNewCategory('');
                }}
              >
                Use Default / Cancel
              </Button>
              <Button
                onClick={() => {
                  // purely close without adding
                  setPendingName(null);
                  setIconPickerOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category List */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCategories.map((category) => {
            const isOpen = openCategories.has(category.id);
            const Icon = getIconComponent(category.icon);

            return (
              <Collapsible
                key={category.id}
                open={isOpen}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <div className="border rounded-xl bg-white">
                  <CollapsibleTrigger asChild>
                    {/* Responsive: stack on small screens, row on medium+ */}
                    <button className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors">
                      <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 sm:w-6 sm:h-6 text-purple-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {/* counts */}
                          {tasks.filter(t => t.categoryId === category.id).length} tasks · {deadlines.filter(d => d.categoryId === category.id).length} deadlines
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex flex-row items-center gap-2 mt-2 sm:mt-0">
                        <Edit2
                          className="w-5 h-5 text-gray-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditing(category);
                          }}
                        />

                        <Trash2
                          className="w-5 h-5 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteCategory(category.id);
                          }}
                        />

                        <ChevronRight
                          className={`w-5 h-5 transition ${isOpen ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="p-4 border-t bg-purple-50/50 overflow-visible">
                      <CategoryView
                        category={category}
                        tasks={tasks.filter(
                          (t) => t.categoryId === category.id
                        )}
                        deadlines={deadlines.filter(
                          (d) => d.categoryId === category.id
                        )}
                        onAddTask={(name, details, priority, effort) =>
                          onAddTask(
                            category.id,
                            name,
                            details,
                            priority,
                            effort
                          )
                        }
                        onAddDeadline={(name, details, date) =>
                          onAddDeadline(
                            category.id,
                            name,
                            details,
                            date
                          )
                        }
                        onToggleTask={onToggleTask}
                        onToggleDeadline={onToggleDeadline}
                        onDeleteTask={onDeleteTask}
                        onDeleteDeadline={onDeleteDeadline}
                        onUpdateTask={onUpdateTask}
                        onUpdateDeadline={onUpdateDeadline}
                      />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl w-80 space-y-3">
            <Input
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <div>
              <Label className="text-sm">Icon</Label>
              <div className="grid grid-cols-6 gap-2 mt-2 max-h-36 overflow-auto">
                {Object.keys(iconMap).map((iconName) => {
                  const Icon = getIconComponent(iconName);
                  const active = editing.icon === iconName;
                  return (
                    <button
                      key={iconName}
                      onClick={() =>
                        setEditing({ ...editing, icon: iconName })
                      }
                      className={`flex items-center justify-center p-1 rounded ${active ? 'ring-2 ring-purple-300' : ''}`}
                      type="button"
                      aria-label={iconName}
                    >
                      <div className="w-8 h-8 rounded bg-white border flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-purple-600 text-white rounded-lg py-2"
                onClick={() => {
                  onUpdateCategory(editing.id, editing);
                  setEditing(null);
                }}
              >
                Save
              </button>
              <button
                className="flex-1 border rounded-lg py-2"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}