import { useState, useEffect } from "react";
import { useMoneyManager } from "../../hooks/useMoneyManager";
import type { Bill } from "../../types/money";

// 👇 استيراد مكتبة الترجمة
import { useTranslation } from "react-i18next";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    financialMonthId: number;
    initialData?: Bill | null;
}

export function AddBillModal({ isOpen, onClose, onSuccess, financialMonthId, initialData }: Props) {
    const { addBill, updateBill, loading } = useMoneyManager();
    
    // 👇 تفعيل الترجمة
    const { t } = useTranslation();
    
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#60a5fa");
    const [error, setError] = useState("");

    const defaultColors = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#60a5fa', '#c084fc', '#f87171', '#2dd4bf'];
    
    useEffect(() => {
        if (initialData) {
            setType(initialData.type);
            setAmount(initialData.amount.toString());
            setDescription(initialData.description || "");
            setColor(initialData.color || "#60a5fa");
        } else {
            setType("");
            setAmount("");
            setDescription("");
            setColor(defaultColors[Math.floor(Math.random() * defaultColors.length)]);
        }
        setError("");
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const cleanType = type.trim();
        const cleanDescription = description.trim();

        if (cleanType.length < 2 || cleanType.length > 30) {
            // 👇 ترجمة خطأ الطول
            setError(t('mm_add_bill_err_length', "Category name must be between 2 and 30 characters."));
            return;
        }

        const isValidCategory = /^[\w\s\u0600-\u06FF]+$/.test(cleanType);
        if (!isValidCategory) {
            // 👇 ترجمة خطأ الرموز الممنوعة
            setError(t('mm_add_bill_err_chars', "Invalid characters! Please use only letters and numbers (e.g., Food, Gym)."));
            return;
        }

        try {
            const billData = {
                financialMonthId,
                type: cleanType,
                amount: Number(amount),
                description: cleanDescription,
                color 
            };

            if (initialData) {
                await updateBill(initialData.id, billData);
            } else {
                await addBill(billData);
            }
            
            onSuccess();
            onClose();
        } catch (err: any) {
            // 👇 ترجمة خطأ السيرفر
            setError(err.message || t('mm_add_bill_err_op', "Operation failed. Please check your inputs."));
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-head">
                    <h3 className="modal-title">
                        {/* 👇 ترجمة العنوان */}
                        {initialData ? t('mm_add_bill_edit_title', "✏️ Edit Expense") : t('mm_add_bill_new_title', "💸 Add Expense")}
                    </h3>
                    <button type="button" onClick={onClose} className="small-btn" title={t('comm_cancel_btn', 'Cancel')}>✕</button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: '20px' }}>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div className="auth-field" style={{ flex: '1' }}>
                            <label className="muted small" style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {/* 👇 ترجمة اسم الصنف */}
                                {t('mm_add_bill_category_label', "Category Name")}
                                <span 
                                    title={t('mm_add_bill_category_hint', "Suggestions: Food, Home, Car, Shopping, Gym, Health, Bills, Internet")} 
                                    style={{ 
                                        cursor: 'help', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        width: '16px', 
                                        height: '16px', 
                                        borderRadius: '50%', 
                                        background: 'rgba(255,255,255,0.15)', 
                                        fontSize: '11px', 
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ?
                                </span>
                            </label>
                            <input 
                                type="text" 
                                className="auth-input" 
                                placeholder={t('mm_add_bill_category_placeholder', "e.g. Groceries, Gym")}
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                maxLength={30} 
                                required 
                            />
                        </div>

                        <div className="auth-field" style={{ width: '60px' }}>
                            <label className="muted small" style={{ marginBottom: '5px', display: 'block' }}>
                                {/* 👇 ترجمة اللون */}
                                {t('mm_add_bill_color_label', "Color")}
                            </label>
                            <input 
                                type="color" 
                                className="auth-input" 
                                value={color} 
                                onChange={(e) => setColor(e.target.value)} 
                                style={{ padding: '0', height: '42px', cursor: 'pointer', borderRadius: '8px', border: 'none' }}
                                title={t('mm_add_bill_color_title', "Choose a color")}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label className="muted small" style={{ marginBottom: '5px', display: 'block' }}>
                            {/* 👇 ترجمة المبلغ */}
                            {t('mm_add_bill_amount_label', "Amount (kr)")}
                        </label>
                        <input 
                            type="number" 
                            className="auth-input" 
                            placeholder={t('mm_add_bill_amount_placeholder', "e.g. 500")}
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="auth-field">
                        <label className="muted small" style={{ marginBottom: '5px', display: 'block' }}>
                            {/* 👇 ترجمة الوصف */}
                            {t('mm_add_bill_desc_label', "Description (Optional)")}
                        </label>
                        <input 
                            type="text" 
                            className="auth-input" 
                            placeholder={t('mm_add_bill_desc_placeholder', "e.g. Weekly shopping")}
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            maxLength={150} 
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" onClick={onClose} className="btn ghost" style={{ flex: 1 }}>
                            {t('mm_add_month_cancel', "Cancel")}
                        </button>
                        <button type="submit" className="btn primary-btn" disabled={loading} style={{ flex: 1 }}>
                            {/* 👇 ترجمة أزرار الحفظ */}
                            {loading 
                                ? t('mm_add_bill_processing', "Processing...") 
                                : (initialData ? t('mm_add_bill_update', "Update Bill") : t('mm_add_bill_add', "Add Bill"))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}