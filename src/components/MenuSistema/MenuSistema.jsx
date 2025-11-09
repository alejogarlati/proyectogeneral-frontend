import { useEffect } from "react";
import { useState } from "react";
import { getMenus } from "@/services/services";
import { InlineEditableTitle } from "@/components/InlineEditableTitle/InlineEditableTitle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const MenuSistema = () => {
  const [editing, setEditing] = useState(null);

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    (async () => {
    const resp = await getMenus();
      setMenus(resp.data.data);
    })();

  }, []);

  const updateMenuTitle = (menuId, newTitle) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === menuId ? { ...menu, title: newTitle } : menu
      )
    );
  };

  const updateSubmenuTitle = (menuId, subMenuId, newTitle) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              submenu: menu.submenu?.map((submenu) =>
                submenu.id === subMenuId
                  ? { ...submenu, title: newTitle }
                  : submenu
              ),
            }
          : menu
      )
    );
  };

  const stopToggle = (e) => {
    if (editing) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {menus.map((menu) => {
        const isEditingMenu =
          editing?.type === "menu" && editing?.id === menu.id;
        if (menu.submenu?.length)
          return (
            <AccordionItem
              key={menu.id}
              value={String(menu.id)}
              className="border rounded-lg"
            >
              {isEditingMenu ? (
                <div
                  className="px-4 py-2 font-medium bg-muted/40 rounded-t-lg"
                  onMouseDown={stopToggle}
                >
                  <InlineEditableTitle
                    value={menu.title}
                    onSave={async (newTitle) =>
                      updateMenuTitle(menu.id, newTitle)
                    }
                    onCancel={() => setEditing(null)}
                    className="w-full"
                  />
                </div>
              ) : (
                <AccordionTrigger
                  className="px-4 py-2 font-medium hover:bg-muted/60"
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditing({ type: "menu", id: menu.id });
                  }}
                >
                  {menu.title}
                </AccordionTrigger>
              )}
              {menu.submenu?.map((submenu) => {
                const isEditingSub =
                  editing?.type === "submenu" &&
                  editing?.id === submenu.id &&
                  editing?.parentId === menu.id;

                return (
                  <AccordionContent
                    key={submenu.id}
                    className="px-4 py-2 text-sm text-muted-foreground"
                  >
                    <div
                      className="ps-3 py-1 rounded hover:bg-muted/40"
                      onDoubleClick={() =>
                        setEditing({
                          type: "submenu",
                          id: submenu.id,
                          parentId: menu.id,
                        })
                      }
                      onMouseDown={stopToggle}
                    >
                      {isEditingSub ? (
                        <InlineEditableTitle
                          value={submenu.title}
                          onSave={async (newTitle) =>
                            updateSubmenuTitle(menu.id, submenu.id, newTitle)
                          }
                          onCancel={() => setEditing(null)}
                          className="max-w-sm"
                        />
                      ) : (
                        <span className="block">{submenu.title}</span>
                      )}
                    </div>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
          );
        else
          return (
            <div key={menu.id} className="border rounded-lg">
              <div
                className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40 cursor-text"
                onDoubleClick={() => setEditing({ type: "menu", id: menu.id })}
                onMouseDown={stopToggle}
              >
                {isEditingMenu ? (
                  <InlineEditableTitle
                    value={menu.title}
                    onSave={async (newTitle) =>
                      updateMenuTitle(menu.id, newTitle)
                    }
                    onCancel={() => setEditing(null)}
                    className="max-w-sm"
                  />
                ) : (
                  <span>{menu.title}</span>
                )}
              </div>
            </div>
          );
      })}
    </Accordion>
  );
};
