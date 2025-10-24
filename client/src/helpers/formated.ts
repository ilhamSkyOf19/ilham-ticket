// format currency
export const formatIDR = (value: number): string => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);




// format date 
export const formatDate = (date: Date): string => {
    return date.toLocaleString('id-ID',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
}


// format date 
export const formatOnlyDate = (date: Date): string => {
    return date.toLocaleString('id-ID',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
}