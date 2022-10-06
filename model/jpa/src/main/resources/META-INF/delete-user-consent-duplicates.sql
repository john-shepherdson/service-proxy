DELETE FROM user_consent_client_scope
WHERE user_consent_id IN (
    SELECT uc.id
    FROM user_consent uc
    INNER JOIN (
        SELECT client_id, user_id, MAX(last_updated_date) AS min_updated_date
        FROM user_consent
        GROUP BY client_id, user_id
        HAVING COUNT(*) > 1
    ) min_dates ON uc.client_id = min_dates.client_id
                AND uc.user_id = min_dates.user_id
                AND uc.last_updated_date = min_dates.min_updated_date
);

DELETE FROM user_consent
WHERE (client_id, user_id, last_updated_date) IN (
    SELECT uc.client_id, uc.user_id, uc.last_updated_date
    FROM user_consent uc
    INNER JOIN (
        SELECT client_id, user_id, MAX(last_updated_date) AS min_updated_date
        FROM user_consent
        GROUP BY client_id, user_id
        HAVING COUNT(*) > 1
    ) min_dates ON uc.client_id = min_dates.client_id
                AND uc.user_id = min_dates.user_id
                AND uc.last_updated_date = min_dates.min_updated_date
);