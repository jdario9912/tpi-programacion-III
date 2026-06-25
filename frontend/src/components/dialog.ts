interface DialogOptions {
  closeOnBackdropClick?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export abstract class Dialog {
  readonly element: HTMLDialogElement;
  protected options: DialogOptions;

  constructor(dialogElement: HTMLDialogElement, options: DialogOptions = {}) {
    this.element = dialogElement;
    this.options = { closeOnBackdropClick: true, ...options };
    this.init();
  }

  private init(): void {
    this.element
      .querySelectorAll<HTMLElement>("[data-close]")
      .forEach((btn) => {
        btn.addEventListener("click", () => this.close());
      });

    if (this.options.closeOnBackdropClick) {
      this.element.addEventListener("click", (e) =>
        this.handleBackdropClick(e),
      );
    }

    this.element.addEventListener("close", () => this.options.onClose?.());
  }

  private handleBackdropClick(e: MouseEvent): void {
    const rect = this.element.getBoundingClientRect();
    const dentro =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!dentro) this.close();
  }

  open(): void {
    this.element.showModal();
    this.options.onOpen?.();
  }

  close(): void {
    this.element.close();
  }
}
