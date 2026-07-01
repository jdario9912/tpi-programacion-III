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
    if (e.target === this.element) {
      this.close();
    }
  }

  open(): void {
    this.element.showModal();
    this.options.onOpen?.();
  }

  close(): void {
    this.element.close();
  }
}
