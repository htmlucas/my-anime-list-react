import Swal, { SweetAlertIcon } from "sweetalert2"

export const Alert = (title: string, error: string, type: SweetAlertIcon) => {
    Swal.fire({
        title: title,
        text: error,
        icon: type,
        confirmButtonText: 'Ok'
      })
}

