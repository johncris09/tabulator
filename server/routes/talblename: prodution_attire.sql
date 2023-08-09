talblename: prodution_attire candidate judge score rank Candidate 1 Judge 1 1 2 Candiate 2 Judge 1 2 1 Candidate 1 Judge 2 1 2 Candiate 2 Judge 2 2 1 talblename: prodution_number candidate judge score rank Candidate 1 Judge 1 1 2 Candiate 2 Judge 1 2 1 Candidate 1 Judge 2 1 2 Candiate 2 Judge 2 2 1 talblename: top_five candidate judge score rank Candidate 1 Judge 1 1 2 Candiate 2 Judge 1 2 1 Candidate 1 Judge 2 1 2 Candiate 2 Judge 2 2 1 final result must be like this production attire production number top_five candidate score rank score rank score rank Candidate 1 1 2 1 2 1 2 Candiate 2 2 1 2 1 2 1 can you create a query on this
where
    judge is equal to judge1,
    just ignore the data just focus on how the table structured.
SELECT
    pa.candidate,
    pa.score AS attire_score,
    pa.rank AS attire_rank,
    pn.score AS number_score,
    pn.rank AS number_rank,
    tf.score AS top_five_score,
    tf.rank AS top_five_rank
FROM
    production_attire pa
    JOIN production_number pn ON pa.candidate = pn.candidate
    JOIN top_five tf ON pa.candidate = tf.candidate
WHERE
    pa.judge = 2
    AND pn.judge = 2
    AND tf.judge = 2;

-- SELECT
--         c.number as number,
--         c.name as name 
--       FROM
--           production_attire tp
--          right JOIN candidate c ON tp.candidate = c.id
--       GROUP BY
--           c.name
--     order by 
--     c.number

SELECT
    c.number AS NUMBER,
    c.name AS NAME,
    pa.score AS pa_score,
    pa.rank AS pa_rank,
    pn.score AS pn_score,
    pn.rank AS pn_rank,
    tf.score AS tf_score,
    tf.rank AS tf_rank
FROM
    candidate c
LEFT JOIN production_attire pa ON
    pa.candidate = c.id AND pa.judge = 2
LEFT JOIN production_number pn ON
    pn.candidate = c.id AND pn.judge = 2
LEFT JOIN top_five tf ON
    tf.candidate = c.id AND tf.judge = 2
ORDER BY
    c.number;