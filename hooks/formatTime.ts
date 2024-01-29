import useTranslate from "./use-translate";

export const useFormatTime = () => {
    const { translate } = useTranslate();

    const formatTime12 = (minutes: any) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const amPm = hours >= 12 ? ((hours >= 24) ? translate('time.am') : translate('time.pm')) : translate('time.am');
        const displayHours = hours === 0 ? 12 : hours > 12 ? ((hours > 24) ? hours - 24 : hours - 12) : hours;
        const paddedHours = String(displayHours).padStart(2, '0');
        const paddedMinutes = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes} ${amPm}`;
    };

    const formatTime24 = (minutes: any) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}`;
    };

    const formatDateToYYYYMMDD = (date: Date | null) => {
        if (date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return null;
    }

    return {
        formatTime12,
        formatTime24,
        formatDateToYYYYMMDD
    };
};