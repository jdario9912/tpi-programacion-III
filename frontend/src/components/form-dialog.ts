import { Dialog } from "./dialog";

interface FormDialogOptions<T> {
  closeOnBackdropClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit: (data: T) => void;
}

export class FormDialog<T> extends Dialog {
  private form: HTMLFormElement;

  constructor(dialogElement: HTMLDialogElement, options: FormDialogOptions<T>) {
    super(dialogElement, options);

    const form = dialogElement.querySelector("form");
    if (!form)
      throw new Error("FormDialog requiere un <form> dentro del <dialog>");
    this.form = form;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this.form).entries()) as T;
      options.onSubmit(data);
    });
  }

  override open(initialData?: Partial<Record<string, string>>): void {
    this.form.reset();
    if (initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        const field = this.form.elements.namedItem(key);
        if (field && "value" in field) {
          (field as HTMLInputElement).value = value ?? "";
        }
      }
    }
    super.open();
  }
}
