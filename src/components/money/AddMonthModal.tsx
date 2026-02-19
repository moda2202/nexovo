import { useState, useEffect } from "react";
import { useMoneyManager } from "../../hooks/useMoneyManager";
import type { DashboardItem } from "../../types/money";

// 👇 استيراد مكتبة الترجمة
import { useTranslation } from "react-i18next";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: DashboardItem | null;
}

export function AddMonthModal({ isOpen, onClose, onSuccess, initialData }: Props) {
    const { createMonth, updateMonth, loading } = useMoneyManager();
    
    // 👇 تفعيل الترجمة
    const { t } = useTranslation();

    const [dateValue, setDateValue] = useState("");
    const [income, setIncome] = useState("");
    const [error, setError] = useState("");

    // مصفوفة مساعدة لتحويل رقم الشهر لاسم (تبقى بالإنجليزي من أجل الـ Backend)
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                const monthIndex = monthNames.indexOf(initialData.month);
                const monthNumber = String(monthIndex + 1).padStart(2, '0');
                setDateValue(`${initialData.year}-${monthNumber}`);
                setIncome(initialData.totalIncome.toString());
            } else {
                const now = new Date();
                const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
                const currentYear = now.getFullYear();
                setDateValue(`${currentYear}-${currentMonth}`);
                setIncome("");
            }
            setError("");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!dateValue) {
            // 👇 ترجمة رسالة الخطأ
            setError(t('mm_add_month_err_date', "Please select a valid month and year."));
            return;
        }

        try {
            const [yearStr, monthStr] = dateValue.split("-");
            const selectedYear = Number(yearStr);
            const selectedMonthName = monthNames[Number(monthStr) - 1];

            if (initialData) {
                await updateMonth(initialData.id, {
                    year: selectedYear,
                    month: selectedMonthName,
                    totalIncome: Number(income)
                });
            } else {
                await createMonth({
                    year: selectedYear,
                    month: selectedMonthName,
                    totalIncome: Number(income)
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            // 👇 ترجمة رسالة الخطأ في حال فشل السيرفر
            setError(err.message || t('mm_add_month_err_op', "Operation failed"));
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-head">
                    <h3 className="modal-title">
                        {/* 👇 ترجمة العناوين */}
                        {initialData ? t('mm_add_month_edit_title', "✏️ Edit Month") : t('mm_add_month_new_title', "📅 Start New Month")}
                    </h3>
                    <button onClick={onClose} className="small-btn" title={t('comm_cancel_btn', 'Cancel')}>✕</button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '20px' }}>

                    <div className="auth-field">
                        <label className="muted small" style={{ marginBottom: '5px', display: 'block' }}>
                            {/* 👇 ترجمة تسمية حقل التاريخ */}
                            {t('mm_add_month_select_label', "Select Month & Year")}
                        </label>
                        <input
                            type="month"
                            className="auth-input"
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                            required
                            onClick={(e) => {
                                try {
                                    e.currentTarget.showPicker();
                                } catch (err) {
                                    // صامت
                                }
                            }}
                            style={{
                                colorScheme: 'dark',
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    <div className="auth-field">
                        <label className="muted small" style={{ marginBottom: '5px', display: 'block' }}>
                            {/* 👇 ترجمة تسمية الدخل */}
                            {t('mm_add_month_income_label', "Total Income")}
                        </label>
                        <input
                            type="number"
                            className="auth-input"
                            placeholder={t('mm_add_month_income_placeholder', "e.g. 25000")}
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} className="btn ghost" style={{ flex: 1 }}>
                            {/* 👇 ترجمة زر الإلغاء */}
                            {t('mm_add_month_cancel', "Cancel")}
                        </button>
                        <button type="submit" className="btn primary-btn" disabled={loading} style={{ flex: 1 }}>
                            {/* 👇 ترجمة أزرار الحفظ */}
                            {loading 
                                ? t('mm_add_month_saving', "Saving...") 
                                : (initialData ? t('mm_add_month_update', "Update") : t('mm_add_month_save', "Save"))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}